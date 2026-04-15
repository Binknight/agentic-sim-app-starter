param(
    [ValidateSet('debug', 'release')]
    [string]$BuildMode = 'debug',

    [switch]$Clean
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$devecoRoot = 'C:\Program Files\Huawei\DevEco Studio'
$sdkRoot = Join-Path $devecoRoot 'sdk\default'
$jbrBin = Join-Path $devecoRoot 'jbr\bin'
$hvigorEntry = Join-Path $env:USERPROFILE '.hvigor\project_caches\d1f60d5018457f1402da22043248105e\workspace\node_modules\@ohos\hvigor\bin\hvigor.js'
$compatSdkRoot = Join-Path $projectRoot '.deveco-sdk'
$compatPlatformRoot = Join-Path $compatSdkRoot 'platform'
$compatSdkPkg = Join-Path $compatPlatformRoot 'sdk-pkg.json'
$openharmonyTarget = Join-Path $sdkRoot 'openharmony'
$hmsTarget = Join-Path $sdkRoot 'hms'

function Assert-PathExists {
    param(
        [string]$Path,
        [string]$Message
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        throw $Message
    }
}

function Ensure-CompatSdk {
    New-Item -ItemType Directory -Force -Path $compatPlatformRoot | Out-Null

    $sdkPkgContent = @'
{
  "meta": {
    "version": "1.0.0"
  },
  "data": {
    "apiVersion": "22",
    "displayName": "HarmonyOS 6.0.2",
    "path": "platform",
    "platformVersion": "6.0.2",
    "releaseType": "Release",
    "version": "6.0.2.130",
    "stage": "Release"
  }
}
'@
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($compatSdkPkg, $sdkPkgContent, $utf8NoBom)

    $junctions = @(
        @{ Link = (Join-Path $compatPlatformRoot 'openharmony'); Target = $openharmonyTarget },
        @{ Link = (Join-Path $compatPlatformRoot 'hms'); Target = $hmsTarget }
    )

    foreach ($item in $junctions) {
        if (Test-Path -LiteralPath $item.Link) {
            $linkItem = Get-Item -LiteralPath $item.Link
            $currentTarget = $null
            if ($linkItem.LinkType -eq 'Junction') {
                $currentTarget = @($linkItem.Target)[0]
            }

            if ($currentTarget -ne $item.Target) {
                Remove-Item -LiteralPath $item.Link -Force
                New-Item -ItemType Junction -Path $item.Link -Target $item.Target | Out-Null
            }
        }
        else {
            New-Item -ItemType Junction -Path $item.Link -Target $item.Target | Out-Null
        }
    }
}

Assert-PathExists -Path $devecoRoot -Message "DevEco Studio not found: $devecoRoot"
Assert-PathExists -Path $sdkRoot -Message "Harmony SDK not found: $sdkRoot"
Assert-PathExists -Path $jbrBin -Message "Bundled JDK not found: $jbrBin"
Assert-PathExists -Path $hvigorEntry -Message "hvigor entry not found: $hvigorEntry"
Assert-PathExists -Path $openharmonyTarget -Message "openharmony SDK not found: $openharmonyTarget"
Assert-PathExists -Path $hmsTarget -Message "hms SDK not found: $hmsTarget"

Ensure-CompatSdk

$env:DEVECO_SDK_HOME = $compatSdkRoot
$env:PATH = "$jbrBin;$env:PATH"

Push-Location $projectRoot
try {
    if ($Clean) {
        node $hvigorEntry clean --no-daemon
        if ($LASTEXITCODE -ne 0) {
            exit $LASTEXITCODE
        }
    }

    node $hvigorEntry assembleHap -p enableSignTask=false -p buildMode=$BuildMode --no-daemon --stacktrace
    if ($LASTEXITCODE -ne 0) {
        exit $LASTEXITCODE
    }

    $outputDir = Join-Path $projectRoot 'entry\build\default\outputs\default'
    if (Test-Path -LiteralPath $outputDir) {
        Write-Host ''
        Write-Host "Build artifacts:"
        Get-ChildItem -LiteralPath $outputDir -Filter *.hap |
            Sort-Object LastWriteTime -Descending |
            ForEach-Object { Write-Host "  $($_.FullName)" }
    }
}
finally {
    Pop-Location
}

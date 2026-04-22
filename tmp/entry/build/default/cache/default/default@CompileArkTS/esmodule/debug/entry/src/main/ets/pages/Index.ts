if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    deliveryItems?: string[];
    acceptanceItems?: AcceptanceItem[];
}
interface AcceptanceItem {
    title: string;
    detail: string;
}
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.deliveryItems = [
            '生成场景 spec 并写入 dev/spec',
            '拆分独立 mock JSON 文件并集中放置到 dev/mock-data/generic-002',
            '完成 HarmonyOS HAP 构建验证'
        ];
        this.acceptanceItems = [
            {
                title: '页面语义正确',
                detail: '首页明确表达当前场景没有新增功能实现。'
            },
            {
                title: '数据文件独立',
                detail: '场景元数据、页面说明和验收项拆分为独立 JSON 文件。'
            },
            {
                title: '工程可出包',
                detail: '按照 README 和 build.ps1 指引完成 HAP 构建验证。'
            }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.deliveryItems !== undefined) {
            this.deliveryItems = params.deliveryItems;
        }
        if (params.acceptanceItems !== undefined) {
            this.acceptanceItems = params.acceptanceItems;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private readonly deliveryItems: string[];
    private readonly acceptanceItems: AcceptanceItem[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.backgroundColor('#F3F6FB');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 18 });
            Column.width('100%');
            Column.padding(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Generic Scenario 002');
            Text.fontSize(30);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#182431');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('当前场景输入为“什么都不需要实现”，因此应用保留为一个可构建、可验收的通用说明页。');
            Text.fontSize(15);
            Text.fontColor('#4E5969');
            Text.lineHeight(22);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius(24);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('NO FEATURE WORK');
            Text.fontSize(12);
            Text.fontColor('#0A59F7');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('无需新增业务实现');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#0F172A');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('本次交付只保留与场景匹配的静态说明内容，避免扩展不存在的流程或交互。');
            Text.fontSize(15);
            Text.fontColor('#475467');
            Text.lineHeight(22);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('本次交付内容');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 12 });
                    Row.width('100%');
                    Row.padding({ left: 14, right: 14, top: 12, bottom: 12 });
                    Row.backgroundColor('#FFFFFF');
                    Row.borderRadius(18);
                    Row.alignItems(VerticalAlign.Top);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('•');
                    Text.fontSize(18);
                    Text.fontColor('#0A59F7');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item);
                    Text.layoutWeight(1);
                    Text.fontSize(16);
                    Text.fontColor('#1D2939');
                    Text.lineHeight(22);
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.deliveryItems, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('验收要点');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.width('100%');
            Text.textAlign(TextAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 6 });
                    Column.width('100%');
                    Column.padding({ left: 16, right: 16, top: 14, bottom: 14 });
                    Column.backgroundColor('#FFFFFF');
                    Column.borderRadius(18);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.title);
                    Text.fontSize(17);
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor('#0F172A');
                    Text.width('100%');
                    Text.textAlign(TextAlign.Start);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.detail);
                    Text.fontSize(14);
                    Text.fontColor('#60758A');
                    Text.lineHeight(21);
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.acceptanceItems, forEachItemGenFunction, (item: AcceptanceItem) => item.title, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.hauwei.arkUIdemo", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });

class PageControl {

    private _displayId: number = 0;
    private _displayName: String = '';
    private _showingFlag: boolean = false;

    set displayId(displayId) {
        console.log("Set displayId : " + displayId);
        this._displayId = displayId;
    }

    get displayId() {
        console.log("Get displayId : " + this._displayId);
        return this._displayId;
    }

    set displayName(displayName) {
        console.log("Set displayName : " + displayName);
        this._displayName = displayName;
    }

    get displayName() {
        console.log("Get displayName : " + this._displayName);
        return this._displayName;
    }

    set showingFlag(showingFlag) {
        console.log("Set showingFlag : " + showingFlag);
        this._showingFlag = showingFlag;
    }

    get showingFlag() {
        console.log("Get showingFlag : " + this._showingFlag);
        return this._showingFlag;
    }

}
export default PageControl
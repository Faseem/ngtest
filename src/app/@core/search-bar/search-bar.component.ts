import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, map, tap, switchMap, finalize } from "rxjs/operators";

@Component({
    selector: "app-search-bar",
    templateUrl: "./search-bar.component.html",
    styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit{
    @Input() placeHolder:string;
    @Input() listOfValues: Array<any>;
    @Input() displayField:string;
    @Output() valueChanged = new EventEmitter<any>();
    @Input() callBackFn:any;
    @Input() searchType:string='';
    @Input() clearSearch: boolean = false;
    selectedValue:any;
    searchPerformed:boolean=false;
    useCallBackFn:boolean=false;
    searching:boolean;
    searchField:boolean;
    noResult:string = "No Results";

    formatMatches = (value:any)=>value[this.displayField] || value;

    ngOnInit(){
        if(!this.listOfValues){
            this.useCallBackFn = true;
        }
        if(this.clearSearch){
            this.clear();
        }
    }

    selectItem(event){
        if(event.item[this.displayField] !== this.noResult){
            this.searchPerformed = true;
            this.valueChanged.emit(event.item);
        }else{
            event.preventDefaults();
            this.selectedValue = null;
            event.item=null;
        }
    }


    clear(){
        this.searchPerformed = false;
        this.selectedValue=null;
        this.valueChanged.emit(this.selectedValue);
    }

    search(){
        this.valueChanged.emit(this.selectedValue);
    }

    searchByEnter(){
        this.valueChanged.emit(this.selectedValue);
    }
    typeAheadSearch = (text$: Observable<string>) => this.selectSearchFunc(text$);

    private selectSearchFunc = (text$:Observable<string>) => {
        if(!this.listOfValues || this.listOfValues.length==0){
            return this.mapSearchCallBackFn(text$);
        }else{
            return this.mapSearch(text$);
        }
    }

    private mapSearch = (text$: Observable<string>)=>{
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            map(tearm => tearm.length <2 ?
                 [] :
                 this.listOfValues.filter(v=>v.toLowerCase().indexOf(tearm.toLowerCase())> -1).slice(0,10))
        );
    }

    private mapSearchCallBackFn = (text$: Observable<string>)=>
    text$.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(()=>(this.searching=true)),
        switchMap(tearm=>tearm.length<2?[]:this.callBackFn(tearm)),
        tap((data:any)=>{
            this.searching = false;
            if(data.length<1){
                data.push({[this.displayField]:this.noResult});
            }
        }), finalize(()=>(this.searching = false))
    );
}
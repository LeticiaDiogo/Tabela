import { ElementDialogComponent } from './../../shared/element-dialog/element-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hidrogênio', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Hélio', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lítio', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Berílio', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boro', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbono', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogênio', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxigénio', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Flúor', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neônio', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatTable)
  table!
  :MatTable<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openDialog(element: PeriodicElement | null){
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null?{
        position: null,
        name:null,
        weight:null,
        symbol:''
      }:{
        position: element.position,
        name: element.name,
        weight: element.weight,
        symbol: element.symbol
      }
      })

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.dataSource.map(p => p.position).includes(result.position)){
          this.dataSource[result.position - 1]= result;
          this.table.renderRows();
        }else{
        this.dataSource.push(result);
        this.table.renderRows();
      }
      }});


    }

    deleteElement(position:number): void{
      this.dataSource = this.dataSource.filter(p => p.position !== position);
    }

    editElement(element:PeriodicElement): void{
      this.openDialog(element);
    }
  }


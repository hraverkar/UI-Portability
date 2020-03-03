import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-study-management',
  templateUrl: './study-management.component.html',
  styleUrls: ['./study-management.component.css']
})
export class StudyManagementComponent implements OnInit {
  public value: number;
  public viewValue: string;
  public studyDes: string;
  public studyName: string;
  public picker: any;
  public selectValue: string;
  public selectDate: Date;
  constructor(
    private cd: ChangeDetectorRef,
  ) { }
  ngOnInit(): void {
  }

  searchText() {
    try {
      this.studyDes = this.studyDes;

    } catch (error) {
      console.log(error + "Error on search");
    }
  }

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];


  clearSearch() {
    try {
      this.studyDes = '';
      this.studyName = '';
      this.selectValue = '';
      this.selectDate = null;
      this.cd.detectChanges();
    } catch (error) {
      console.table(error, 'clearSearch error , searchComponent', 'clearing search input values');
    }
  }

  changeValue(value: any) {
    this.selectValue = value;
  }


  studySearch(enterPressed: boolean) {
    try {
      this.studyDes = this.studyDes.trim();
      if (enterPressed && this.studyDes.length === 0) {
        return;
      } else if (/^[\W_]+$/.test(this.studyDes)) {
        console.table('Search pattern is incorrect.Please input proper pattern.');
        return;
      }

      let queryConditions = [];
      let query = '';
      if (this.studyDes.length > 0) {
        queryConditions.push('studydescription=' + this.studyDes);
      }
      if (this.studyName.length > 0) {
        queryConditions.push('name=' + this.studyName);
      }

      /** Dynamic query generation loop */
      for (let i = 0; i < queryConditions.length; i++) {
        if (i === 0) {
          query = query + queryConditions[i];
        } else {
          query = query + '&' + queryConditions[i];
        }
      }
    } catch (error) {
      console.log(error, 'Search error , Study Component', 'searching using input values');
    }
  }

  changeEvent(event:any) {
    this.selectDate = event.value;
  }
}

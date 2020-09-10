import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectionArray = ['["P>E" , "E>R" , "R>U"]', '["I>N", "A>I", "P>A", "S>P"]']
  mainArray = [["P>E", "E>R", "R>U"], ["I>N", "A>I", "P>A", "S>P"]];
  afterSelection = [];
  temArray = [];
  result = ''
  constructor() {
    this.afterSelection = [...this.mainArray[0]]
    this.display();
  }
  display() {
    this.temArray = [];
    this.afterSelection.forEach((ele, index) => {
      let elements = ele.split('>');
      this.temArray = [...this.temArray, ...elements];
      if (index == this.afterSelection.length - 1) {
        this.temArray = Array.from(new Set(this.temArray))
        this.finalResult()
      }
    })
  }
  findElement(temArray: any[], arr: any[]) {
    let modifiedArray = []
    temArray.indexOf(arr[0]) == -1 ? modifiedArray.push(arr[0]) : '';
    temArray.indexOf(arr[1]) == -1 ? modifiedArray.push(arr[1]) : '';
    return { array: modifiedArray, firstElementIndex: temArray.indexOf(arr[0]), secondElementIndex: temArray.indexOf(arr[1]) }
  }
  onChange(e) {
    this.afterSelection = []
    this.afterSelection = [...this.mainArray[this.selectionArray.indexOf(e.target.value)]]
    this.display();
  }
  finalResult() {
    this.temArray.forEach((char, index) => {
      let latterInfirstPlace = this.afterSelection.filter((nString: string) => {
        return nString.indexOf(char) == 0;
      });
      let latterInlastPlace = this.afterSelection.filter((nString: string) => {
        return nString.indexOf(char) == 2;
      });

      if (latterInlastPlace.length === 0) {
        let charIndex = this.temArray.indexOf(char);
        this.temArray.splice(charIndex, 1);
        this.temArray.splice(0, 0, char);
      }
      if (latterInfirstPlace.length > 0) {
        let elements = latterInfirstPlace[0].split('>');
        let firstElementIndex = this.temArray.indexOf(elements[0]);
        let secondElementIndex = this.temArray.indexOf(elements[1]);
        if (secondElementIndex > firstElementIndex && secondElementIndex - firstElementIndex != 1) {
          this.temArray.splice(secondElementIndex, 1);
          this.temArray.splice(firstElementIndex + 1, 0, elements[1]);
          if (index == this.temArray.length - 1) {
            this.finalResult();
          } else {
            this.resultWord()
          }
        } else {
         this.resultWord()
        }
      }
    });
  }
  resultWord() {
    let finalList = Array.from(new Set(this.temArray));
    this.result = '';
    this.result = finalList.toString().replace(/[,.]/g, '');
  }
}
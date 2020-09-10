import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectionArray = ["[P>E , E>R , R>U]", "[I>N, A>I, P>A, S>P]"]
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
    this.afterSelection.forEach((ele) => {
      let elements = ele.split('>');
      if (this.temArray.length === 0) {
        this.temArray = [...this.temArray, ...elements];
      } else {
        let elementsObj = this.findElement(this.temArray, elements);
        if (elementsObj.firstElementIndex == -1 && elementsObj.secondElementIndex == -1) {
          this.temArray = [...this.temArray, ...elementsObj.array];
        }
        else if (elementsObj.firstElementIndex == -1) {
          this.temArray.splice(elementsObj.secondElementIndex, 0, elementsObj.array[0])
        }
        else if (elementsObj.secondElementIndex == -1) {
          this.temArray.splice(elementsObj.firstElementIndex + 1, 0, elementsObj.array[0])
        }
      }
    })
    let finalList = Array.from(new Set(this.temArray));
    this.result = '';
    this.result = finalList.toString().replace(/[,.]/g, '');
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
}

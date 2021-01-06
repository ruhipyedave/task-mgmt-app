import { Component, OnInit } from '@angular/core';
import { List } from "./list";
import { LocalStorageService, LocalStorage } from 'angular-web-storage';
import Swal from 'sweetalert2';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { debug } from 'console';

// import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  	constructor(private local: LocalStorageService) { }
  	lists: List[] = [
	 	new List("To Do", ["Pay Electricity Bill", "Make Grocery List"]),
	 	new List("In Progress", ["Iron Cloths"]),
 		new List("Done", ["Buy Running Shoes"]),
	];

  connectedTo: string[] = [];

  ngOnInit(): void {
    let locallyStoredList = this.local.get("lists");
    if (!locallyStoredList || !locallyStoredList.length){
      this.local.set("lists", this.lists, 1, 'y');
    } else {
      this.lists = locallyStoredList;
    }

    for (let list of this.lists) {
      this.connectedTo.push(list.name);
    };
  }

  updateLocallyStoredList() {
	this.local.set("lists", this.lists, 1, 'y');
  }

  clearListFromLocalStorage() {
    this.local.remove("lists");
  }

  addCardToList = function (index) {
    if (this.lists[index].cardContent === "") {
		return;
	}
	this.lists[index].cards.push(this.lists[index].cardContent);
	this.lists[index].cardContent = "";
	this.lists[index].add = false;
	this.updateLocallyStoredList();
  }

  cancelAddOperation = function (index) {
    this.lists[index].cardContent = "";
    this.lists[index].add = false;
    this.updateLocallyStoredList();
  }

  showAddCard = function (index) {
    this.lists[index].add = true;
    this.updateLocallyStoredList();
  }

  addNewList = function () {
    this.lists.push(new List("", []),)
  }

  showDeleteListConfimBox(index) {
	  // Custom Buttons
    return Swal.fire({
      title: 'Are you sure you want to delete this list?',
      text: 'You will not be able to recover it later!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteList(index);
      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
      }
    })
  }

  deleteList = function (index) {
	  this.lists.splice(index, 1);
	  this.updateLocallyStoredList();
  }

  onClickOfListName = function (index) {
	  this.lists[index].editName = true;
  }

  onBlurOfListName = function (index) {
    if (this.lists[index].name === "") {
      return;
    }
    // check if list name exists 
    this.lists[index].dupFound = this.lists.find((element, i) => {
      return i !== index && element.name == this.lists[index].name
    });

    if(this.lists[index].dupFound) {
      return;
    }

    this.lists[index].editName = false;
  }

  showDeleteCardConfimBox = function (listIndex, cardIndex) {
    return Swal.fire({
      title: 'Are you sure you want to delete this card?',
      text: 'You will not be able to recover it later!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCardFromList(listIndex, cardIndex);
      } else if (result.isDismissed) {
        console.log('Clicked No, File is safe!');
      }
    })
  }
  
  deleteCardFromList = function (index, cardIndex) {
    this.lists[index].cards.splice(cardIndex, 1);
    this.updateLocallyStoredList();
	}

  dragAndDropList(event: CdkDragDrop<string[]>) {
	  moveItemInArray(this.lists, event.previousIndex, event.currentIndex);
	}
  
	dragAndDropCard(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.updateLocallyStoredList();
  }

  onClickOfCardName = function (listIndex, cardIndex) {
	  if (this.lists[listIndex].editCardInProgress == true) {
		  return;
	  }
	  this.lists[listIndex].editCardInProgress = true;
	  this.lists[listIndex].editCard[cardIndex] = true;
  }
}

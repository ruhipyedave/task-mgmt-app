import { ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { ListComponent } from './list.component';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
// import { By } from 'protractor';
describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, DragDropModule ],
      declarations: [ ListComponent ], 
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    // component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise lists array', () => {
    // component.clearListFromLocalStorage();
    // component.ngOnInit();
    expect(component.lists.length).toBeTruthy();
  });

  it('should add new list to lists array', () => {
    const listLength = component.lists.length;
    component.addNewList();
    expect(component.lists.length).toBe(listLength + 1);
  });
    
  it('Make list name editable on click of list name', () => {
    const index = component.lists.length - 1;
    component.onClickOfListName(index);
    expect(component.lists[index].editName).toBeTrue();
  });

  it('Show list name on blur of list name input box', () => {
    const index = component.lists.length - 1;
    component.onBlurOfListName(index);
    expect(component.lists[index].name).not.toBeNull();
    expect(component.lists[index].editName).toBeFalse();
  });

  it('show delete list confirm box', () => {
    const index = component.lists.length - 1;
    const result = component.showDeleteListConfimBox(index);
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const confirmBox = bannerEl.getElementsByClassName('.swal2-container');
    expect(result).toBeDefined();
  });

  it('should delete a list from lists array', () => {
    const index = component.lists.length - 1;
    component.deleteList(index);
    expect(component.lists.length).toBe(index);
  });

  it('should add new card to the list', () => {
    component.addNewList();
    const index = component.lists.length - 1;
    const numberOfCards = component.lists[index].cards.length;
    component.lists[index].cardContent = `Test add new card ${Date.now()}`
    component.addCardToList(index);
    expect(component.lists[index].cards.length).toBe(numberOfCards + 1);
  });

  it('Make case name editable on click of card name', () => {
    const index = component.lists.length - 1;
    const cardIndex = component.lists[index].cards.length - 1;
    component.onClickOfCardName(index, cardIndex);
    expect(component.lists[index].editCardInProgress).toBeTrue();
    expect(component.lists[index].editCard[cardIndex]).toBeTrue();
  });

  // it('Show card name on blur of card name input box', () => {
  //   const index = component.lists.length - 1;
  //   const cardIndex = component.lists[index].cards.length - 1;
  //   component.onBlurOfCardName(index, cardIndex);
  //   expect(component.lists[index].name).not.toBeNull();
  //   expect(component.lists[index].editName).toBeFalse();
  // });

  it('Should drag and drop a list', () => {
    const ne = fixture.debugElement.nativeElement;
    const myComponent = ne.querySelector('.drag-drop-list');
    debugger;
    expect(myComponent).toBeTruthy();
    // const from: ContainerModel<Aggregation> = {
    //   id: 'availableAggregations',
    //   data: [Aggregation.MEDIAN, Aggregation.MAX, Aggregation.SUM],
    //   index: 1
    // };
    // const to: ContainerModel<Aggregation> = {
    //   id: 'selectedAggregations',
    //   data: component.selectedAggregations,
    //   index: 2
    // };
  
  })

  it('show delete card from list confirm box', () => {
    const index = component.lists.length - 1;
    const cardIndex = component.lists[index].cards.length - 1;
    const result = component.showDeleteCardConfimBox(index, cardIndex);
    const bannerDe: DebugElement = fixture.debugElement;
    const bannerEl: HTMLElement = bannerDe.nativeElement;
    const confirmBox = bannerEl.getElementsByClassName('.swal2-container');
    expect(result).toBeDefined();
  });

  it('should delete a card from the list', () => {
    const index = component.lists.length - 1;
    const cardIndex = component.lists[index].cards.length - 1;
    component.deleteCardFromList(index, cardIndex);
    expect(component.lists[index].cards.length).toBe(cardIndex);
  });

});

/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
// import dataMother from './structureForms.json';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.scss'],
})
export class FormViewComponent implements OnInit {
  @Input() public data: any;

  @Input() public arrayTotal: any[];

  // public dataBase = dataMother;

  status: boolean;

  posModule = 0;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    if (this.arrayTotal.length !== 0) {
      this.posModule = this.arrayTotal.findIndex((data) => data.idModule === this.data.module._id);
      if (this.posModule !== -1) {
        this.status = true;
      } else {
        this.status = false;
      }
    }
  }

  /**
   * La función sirve para cerrar los modales
   * @returns void
   */
  closeModal() {
    this.modalService.dismissAll();
  }

  currentJustify = 'start';

  active = 0;

  activeKeep = 0;

  activeSelected = 0;

  disabled = true;

  tabs = [1, 2, 3, 4, 5];

  counter = this.tabs.length + 1;

  activeDynamic = 0;

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.activeSelected = 1;
    }
  }

  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter((id) => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.counter += 1;
    this.tabs.push(this.counter);
    event.preventDefault();
  }
}

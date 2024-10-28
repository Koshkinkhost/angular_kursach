import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title: string = 'Задайте вопрос';
  @Output() close = new EventEmitter();
private catalog:string="b1gqso3sqcfach5r742a"
private api_deepseek:string='sk-b1c45ab1791b4ea1b20675bf6fff7f98'
  onClose() {
    this.close.emit();
  }
}

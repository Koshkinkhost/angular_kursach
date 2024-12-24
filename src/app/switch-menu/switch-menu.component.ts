import { Component, Input,OnInit,OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-switch-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './switch-menu.component.html',
  styleUrl: './switch-menu.component.css'
})
export class SwitchMenuComponent {
  constructor(private router:Router){}
@Input() currentComponent:string='';
ngOnChanges(changes:SimpleChanges){
  if(changes['currentComponent']){
    this.navigateTo(this.currentComponent)

  }

}
navigateTo(currentComponent:string) {
  switch (currentComponent) {
    case 'login':
      this.router.navigate(['/login']);
      console.log("логин")
      break;
    case 'register':
      this.router.navigate(['/register']);
      break;
    case 'tracks':
        this.router.navigate(['/tracks']);
      break;
    case 'analytics':
        this.router.navigate(['/analytics']);
      break;
    case 'promocodes':
        this.router.navigate(['/promocodes']);
      break;
    default:
      break;
  }
}
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-editor',
  standalone: true,
  imports: [],
  templateUrl: './user-editor.component.html',
  styleUrl: './user-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditorComponent {

}

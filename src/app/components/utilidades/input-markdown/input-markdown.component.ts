import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.scss']
})
export class InputMarkdownComponent {

  @Input() contenidoMarkdown: string = ''
  @Output() changeMarkdown: EventEmitter<string> = new EventEmitter()
  @Input() placeHolderTextarea: string = 'Texto'

}

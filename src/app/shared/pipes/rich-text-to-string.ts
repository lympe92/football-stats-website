import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'richTextToString',
})
export class RichTextToStringPipe implements PipeTransform {
  transform(value: any): string {
    let text = this.convertRichTextToString(value);

    return text;
  }

  convertRichTextToString(richText: any): string {
    let result = '';

    richText.content?.forEach((block: any) => {
      if (block.type === 'paragraph') {
        block.content?.forEach((element: any) => {
          if (element.type === 'text') {
            result += element.text;
          }
        });

        result += ' ';
      }
    });

    return result.trim().substring(0, 300);
  }
}

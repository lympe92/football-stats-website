import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readingTime',
})
export class ReadingTimePipe implements PipeTransform {
  transform(value: any): number {
    let text = this.convertRichTextToString(value);

    return this.findReadingTime(text.length);
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

    return result.trim();
  }

  findReadingTime(textLength: number): number {
    let wordsPerMinute = 400;

    return Math.round(textLength / wordsPerMinute);
  }
}

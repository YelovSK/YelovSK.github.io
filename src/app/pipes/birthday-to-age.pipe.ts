import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

@Pipe({
    name: 'birthdayToAge',
})
export class BirthdayToAgePipe implements PipeTransform {

    transform(birthday: Date | string): string {
        dayjs.extend(duration);

        const diff = Math.abs(dayjs(birthday).diff());
        return dayjs.duration(diff, 'ms').format('YY [years], M [months], D [days]');
    }
}
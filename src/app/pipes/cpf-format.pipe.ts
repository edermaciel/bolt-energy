import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpfFormat' })
export class CpfFormatPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return '';
        }

        // Remove all non-digit characters from the value
        const digitsOnly = value.replace(/\D/g, '');

        // Apply the CPF format (XXX.XXX.XXX-XX)
        const formattedCPF = `${digitsOnly.substring(0, 3)}.${digitsOnly.substring(3, 6)}.${digitsOnly.substring(6, 9)}-${digitsOnly.substring(9, 11)}`;

        return formattedCPF;
    }
}

import { sequelizeConvert, SequelizeConversion } from 'feathers-hooks-common';

export function convertFieldsMap( fields ) {
    var convert = {}
    Object.keys(fields).forEach( k => {
        const field = fields[k];
        if (typeof field.type === "string") {
            convert[k] = field.type;
        }
    });

    return sequelizeConvert(convert, null);
}
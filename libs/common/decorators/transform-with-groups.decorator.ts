import { instanceToPlain, ClassTransformOptions } from 'class-transformer';
import {PlainGroupsEnum} from "@smart-home/libs/common/enums";

export function TransformWithGroup(groups: PlainGroupsEnum[]) {
    return function (target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const result = await originalMethod.apply(this, args);

            if (result && result.constructor) {
                const transformOptions: ClassTransformOptions = {
                    groups: groups,
                };
                return instanceToPlain(result, transformOptions);
            }

            return result;
        };

        return descriptor;
    };
}

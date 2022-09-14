import { PartialType } from "@nestjs/mapped-types";
import { PhoneNumberDto } from "./phone-number-dto";

export class UpdatePhoneNumberDto extends PartialType(PhoneNumberDto) { }
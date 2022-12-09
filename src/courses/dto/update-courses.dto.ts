// import { CreateCourseDto } from "./create-course.dto";
// import { PartialType } from "@nestjs/mapped-types";
import { IsString } from "class-validator";

// export class UpdateCoursesDto extends PartialType(CreateCourseDto) {}
export class UpdateCoursesDto {
  @IsString()
  readonly name?: string;

  @IsString()
  readonly description?: string;

  @IsString({ each: true })
  readonly tags?: string[];
}

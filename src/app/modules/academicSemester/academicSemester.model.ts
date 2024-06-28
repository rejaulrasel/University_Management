import { Schema, model } from "mongoose";
import { AcademicSemesterCode, AcademicSemesterName, MonthsEnum } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";

const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            enum: AcademicSemesterName,
            required: true,
        },
        code: {
            type: String,
            enum: AcademicSemesterCode,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        startMonth: {
            type: String,
            enum: MonthsEnum,
            required: true,
        },
        endMonth: {
            type: String,
            enum: MonthsEnum,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({
        year: this.year,
        name: this.name
    })
    if (isSemesterExists) {
        throw new Error('Semester is already exists!')
    }
    next();
})



export const AcademicSemester =
    model<TAcademicSemester>('AcademicSemester', academicSemesterSchema)

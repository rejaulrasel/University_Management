import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";


const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        {
            role: "student"
        },
        {
            id: 1
            // _id:0
        },
    )
        .sort({
            createdAt: -1
        })
        .lean();

    return lastStudent?.id ? lastStudent.id.substring(6) : undefined
}


//year ...semerter code...4 digits
export const generateStudentId = async (payload: TAcademicSemester) => {
    // first id 0000
    const currentId = await findLastStudentId() || (0).toString();
    let incrementId = (Number(currentId) + 1).toString();
    incrementId = `${payload.year}${payload.code}${incrementId.padStart(4, "0")}`
    return incrementId;

    // console.log(await findLastStudentId())
}
import { MemberType, MemberStatus } from "../enums/member.enum";

export interface Member {
    _id: string;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberName: string;
    memberEmail: string;
    memberPhone?: string;
    memberPassword?: string;
    memberImage?: string;
    memberAddress?: string;
    memberPoints?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface MemberInput {
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberName: string;
    memberEmail: string;
    memberPassword: string;
    memberPhone?: string;
    memberImage?: string;
    memberAddress?: string;
    memberPoints?: number;
}

export interface LoginInput {
    memberEmail: string;
    memberPassword: string;
}

export interface MemberUpdateInput {
    memberName?: string;
    memberEmail?: string;
    memberPhone?: string;
    memberPassword?: string;
    memberImage?: string;
    memberAddress?: string;
}

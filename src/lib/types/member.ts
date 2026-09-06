import { MemberType, MemberStatus } from "../enums/member.enum";

export interface Member {
    _id: string;
    memberType: MemberType;
    memberStatus: MemberStatus;
    memberNick: string;
    memberPhone?: string;
    memberPassword?: string;
    memberImage?: string;
    memberAddress?: string;
    memberDesc?: string;
    memberPoints?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface TopMember extends Member {
    rank: number;
    purchaseCount: number;
    productsBought: number;
    totalSpent: number;
}

export interface MemberInput {
    memberType?: MemberType;
    memberStatus?: MemberStatus;
    memberNick: string;
    memberEmail?: string;
    memberPassword: string;
    memberPhone: string;
    memberImage?: string;
    memberAddress?: string;
    memberPoints?: number;
}

export interface LoginInput {
    memberNick: string;
    memberPassword: string;
}

export interface MemberUpdateInput {
    memberNick?: string;
    memberPhone?: string;
    memberPassword?: string;
    memberImage?: File;
    memberAddress?: string;
}

import axios from "axios";
import { serverApi } from "../../lib/config";
import {
  LoginInput,
  Member,
  MemberInput,
  MemberUpdateInput,
  TopMember,
} from "../../lib/types/member";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = `${serverApi}/member`;
  }

  public async signup(input: MemberInput): Promise<Member> {
    const result = await axios.post<{ member: Member }>(`${this.path}/signup`, input, {
      withCredentials: true,
    });

    this.saveMember(result.data.member);
    return result.data.member;
  }

  public async login(input: LoginInput): Promise<Member> {
    const result = await axios.post<{ member: Member }>(`${this.path}/login`, input, {
      withCredentials: true,
    });

    this.saveMember(result.data.member);
    return result.data.member;
  }

  public async logout(): Promise<void> {
    await axios.post(`${this.path}/logout`, {}, { withCredentials: true });
    localStorage.removeItem("memberData");
  }

  public async getMemberDetail(): Promise<Member> {
    const result = await axios.get<Member>(`${this.path}/detail`, {
      withCredentials: true,
    });
    this.saveMember(result.data);
    return result.data;
  }

  public async getTopUsers(): Promise<TopMember[]> {
    const result = await axios.get<TopMember[]>(`${this.path}/top-users`);
    return result.data;
  }

  public async updateMember(input: MemberUpdateInput): Promise<Member> {
    const formData = new FormData();

    this.appendOptionalField(formData, "memberNick", input.memberNick);
    this.appendOptionalField(formData, "memberPhone", input.memberPhone);
    this.appendOptionalField(formData, "memberPassword", input.memberPassword);
    this.appendOptionalField(formData, "memberAddress", input.memberAddress);
    this.appendOptionalField(formData, "memberImage", input.memberImage);

    const result = await axios.post<{ member?: Member } | Member>(
      `${this.path}/update`,
      formData,
      { withCredentials: true },
    );
    const member = "member" in result.data && result.data.member
      ? result.data.member
      : result.data as Member;

    this.saveMember(member);
    return member;
  }

  private appendOptionalField(formData: FormData, key: string, value?: string | File): void {
    if (value !== undefined) formData.append(key, value);
  }

  private saveMember(member: Member): void {
    localStorage.setItem("memberData", JSON.stringify(member));
  }
}

export default MemberService;

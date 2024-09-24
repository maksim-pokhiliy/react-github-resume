import { NextResponse } from "next/server";

import { IApiError } from "@root/lib/ApiClient";
import apiFactory from "@root/lib";

export const GET = async (
  _: any,
  { params }: { params: { username: string } },
) => {
  try {
    const api = apiFactory({
      apiUrl: process.env.API_URL as string,
    });

    const data = await api.user.retrieve(params.username);
    const response = NextResponse.json({ ...(data ?? {}) }, { status: 200 });

    return response;
  } catch (error) {
    const typedError = error as IApiError;

    return NextResponse.json(typedError, { status: typedError.status });
  }
};

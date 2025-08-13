// 请求响应参数（不包含data）
export interface Result {
    status_id: number;
    message: string;
}

// 请求响应参数（包含data）
export interface ResultData<T = any> extends Result {
    data: T;
}

// 分页响应参数
export interface ResultPage<T> {
    list: T[];
    page: number;
    pageSize: number;
    total: number;
}

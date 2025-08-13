import http from "@/api";
import { RequestDownloadModel } from "@/models/X";


/* * * * * * * * * * * * * * * * * * * * * * [下载模块] * * * * * * * * * * * * * * * * * * * * * * * * * */
// [GET]下载>枚举
export const XDownloadEnumApi = () => {
    return http.get('/x/download/enum');
};

// [POST]下载
export const XDownloadTableApi = (params: RequestDownloadModel) => {
    return http.post('/x/download', params);
};


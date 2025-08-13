export default {
    //获取当前时间戳
    getUnix(): number {
        return new Date().getTime();
    },
    //获取今天0点0分0秒的时间戳
    getTodayUnix(): number {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        return date.getTime();
    },
    //获取今年1月1日0点0秒的时间戳
    getYearUnix(): number {
        let date = new Date();
        date.setMonth(0, 1);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
    },
    //获取标准年月日
    getYMD(time: string | number | Date): string {
        let date = new Date(time);
        let month = (date.getMonth() + 1).toString().padStart(2, '0');  // 月份加1并补零
        let day = date.getDate().toString().padStart(2, '0');           // 天数补零
        return `${date.getFullYear()}-${month}-${day}`;
    },
    //获取标准年月日时分
    getYMDHM(time: string | number | Date): string {
        let date = new Date(time);
        let month = (date.getMonth() + 1).toString().padStart(2, '0');  // 月份加1并补零
        let day = date.getDate().toString().padStart(2, '0');           // 天数补零
        let hours = date.getHours().toString().padStart(2, '0');        // 小时补零
        let minutes = date.getMinutes().toString().padStart(2, '0');    // 分钟补零
        return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}`;
    },
    //转换时间
    getFormateTime(timestamp: string | number | Date): string {
        timestamp = new Date(timestamp).getTime();
        let now = this.getUnix();
        let today = this.getTodayUnix();
        let timer = (now - timestamp) / 1000;
        let tip = '';
        if (timer <= 0) tip = '刚刚';
        else if (Math.floor(timer / 60) <= 0) tip = '刚刚';
        else if (timer < 3600) tip = `${Math.floor(timer / 60)}分钟前`;
        else if (timer >= 3600 && (timestamp - today >= 0)) tip = `${Math.floor(timer / 3600)}小时前`;
        else if (timer / 86400 <= 31) tip = `${Math.ceil(timer / 86400)}天前`;
        else tip = this.getYMD(timestamp);
        return tip;
    },
    //依据当前时间获取时间段
    // 早上：00-09 上午：09-12 中午：12-15 下午：15-18 晚上：18-24
    getTimeSection(time: string | number | Date): string {
        let hour = new Date(time).getHours();
        let timeSection = '';
        if (hour >= 0 && hour < 9) timeSection = '早上';
        else if (hour >= 9 && hour < 12) timeSection = '上午';
        else if (hour >= 12 && hour < 15) timeSection = '中午';
        else if (hour >= 15 && hour < 18) timeSection = '下午';
        else timeSection = '晚上';
        return timeSection;
    }
}

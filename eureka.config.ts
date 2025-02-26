import { Eureka } from 'eureka-js-client';
import { configDotenv } from 'dotenv';
configDotenv();

export const eurekaClient = new Eureka({
  // Eureka 서버 URL
  eureka: {
    host: process.env.EUREKA_HOST, // Eureka 서버 호스트
    port: Number(process.env.EUREKA_PORT), // Eureka 서버 포트
    servicePath: '/eureka/apps/', // 서비스 등록 경로
  },
  instance: {
    app: 'user', // 등록할 서비스 이름
    hostName: 'localhost',
    ipAddr: '127.0.0.1', // 서비스의 IP 주소
    statusPageUrl: `http://localhost:3001/info`,
    port: {
      $: 3001,
      '@enabled': true,
    },
    vipAddress: 'user', // 다른 서비스들이 호출할 주소
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
});

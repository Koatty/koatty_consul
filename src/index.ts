/*
 * @Description:
 * @Usage:
 * @Author: xxx
 * @Date: 2020-12-24 10:32:14
 * @LastEditTime: 2023-03-05 00:23:06
 */
import { Koatty, Logger, Helper } from "koatty";
import Consul, { ConsulOptions } from "consul";
// import { randomUUID } from "crypto";

/**
 *
 *
 * @interface OptionsInterface
 */
export interface OptionsInterface extends ConsulOptions {
  self?: RegisterServiceOpt;  // 注册当前模块配置
}

interface HealthCheck {
  tcp: string; // 健康检测地址
  interval: string; // 健康检测间隔
  timeout: string; // 健康检测超时 5s
}

interface HealthService {
  Service: {
    ID: string; //'169a69bb58f0715e601f9d7d07cce049',
    Service: string; //'pb.Say.grpc',
    Tags: string[]; //[''],
    Address: string; //'192.168.0.16',
    Meta?: any;
    Port: number; // 9000,
  }
}

export interface RegisterServiceOpt {
  name: string; //服务名
  id?: string; //服务ID
  tags?: string[]; //服务tags
  address?: string;
  port?: number;
  meta?: Record<string, string>;
  check?: HealthCheck; // 健康检查
}

export interface ResolverServiceOpt {
  service: string;
  dc?: string;
  tag?: string;
  passing?: boolean;
  near?: string;
}

/**
 * default options
 */
const defaultOptions: OptionsInterface = {
  // self: { // 是否注册当前模块，默认为false
  //   name: 'koattyProject', // 服务名
  //   tags: [], // 标签信息
  //   check: {
  //     tcp: "localhost:3000",
  //     interval: "10s",
  //     timeout: "5s",
  //   },
  // },

  host: "127.0.0.1",
  port: "8500",
  promisify: true,
  secure: false,
};

export function KoattyConsul(options: OptionsInterface, app: Koatty): Promise<any> {
  // todo
  const opt = { ...defaultOptions, ...options };
  const consul = new Consul(opt);

  const RegisterService = function (opt: RegisterServiceOpt) {
    return consul.agent.service.register(opt);
  }
  app.setMetaData("RegisterService", RegisterService);
  if (opt.self) {
    app.once("appStart", function () {
      RegisterService(opt.self);
    })
  }


  const ResolverService = async function (opts: ResolverServiceOpt) {
    const services: HealthService[] = await consul.health.service(opts);
    if (Helper.isArray(services)) {
      for (const it of services) {
        if (it.Service?.Address) {
          return `${it.Service.Address}:${it.Service.Port}`;
        }
      }
    }
    throw Error(`can't find service: ${opts.service}, tags: ${opts.tag}`)
  };

  app.setMetaData("ResolverService", ResolverService);
  return Promise.resolve();
}
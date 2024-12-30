import { ClientsModuleOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';
import {GRPC_HOST} from "@smart-home/libs/grpc";
import {IDefineBaseGrpcConfig} from "@smart-home/libs/common/modules";
import {PinoLoggerService} from "@smart-home/libs/common/logger";

function defineBaseGrpcConfig(params: IDefineBaseGrpcConfig) {
  const { serviceName, host = GRPC_HOST, port } = params;

  return {
    transport: Transport.GRPC,
    options: {
      package: serviceName,
      protoPath: `libs/grpc/proto/${serviceName}.proto`,
      url: `${host}:${port}`,
    },
    logger: new PinoLoggerService(),
  }
}

export function getClientConfig(params: IDefineBaseGrpcConfig): ClientsModuleOptions {
  const baseGrpcConfig = defineBaseGrpcConfig(params);

  return [
    {
      name: `${params.serviceName.toUpperCase()}_PACKAGE`,
      transport: baseGrpcConfig.transport,
      options: baseGrpcConfig.options,
    },
  ] as ClientsModuleOptions;
}

export function getServerConfig(params: IDefineBaseGrpcConfig): MicroserviceOptions {
  return defineBaseGrpcConfig(params) as MicroserviceOptions;
}

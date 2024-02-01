import { Request } from 'express';

export type RequestWithParams<T> = Request<T>;

export type RequestWithBodyAndFile<T> = Request<{}, {}, T>;

export type RequestWithQuery<T> = Request<{}, {}, {}, T>;

export type RequestWithParamsAndBody<Tp, Tb> = Request<Tp, {}, Tb>;

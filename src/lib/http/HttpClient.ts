import { fromFetch } from "rxjs/fetch";
import { tap } from "rxjs/operators";

type RequestBody = { [key: string]: any };

type InterceptorFn = (res: Response) => void;

interface Interceptors {
  pre: InterceptorFn[];
  post: InterceptorFn[];
}

export class HttpClient {
  private interceptors: Interceptors = {
    pre: [],
    post: []
  };

  private encode(data: RequestBody) {
    return JSON.stringify(data);
  }

  private fetch(url: string, init: RequestInit) {
    return fromFetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init ? init.headers : null)
      }
    }).pipe(
      tap(res => {
        for (const i of this.interceptors.post) {
          i(res);
        }
      })
    );
  }

  public get(url: string, init?: RequestInit) {
    return this.fetch(url, {
      method: "GET",
      ...init
    });
  }

  public post(url: string, data: RequestBody, init?: RequestInit) {
    return this.fetch(url, {
      method: "POST",
      ...init,
      body: this.encode(data)
    });
  }

  public put(url: string, data: RequestBody, init?: RequestInit) {
    return this.fetch(url, {
      method: "PUT",
      ...init,
      body: this.encode(data)
    });
  }

  public patch(url: string, data: RequestBody, init?: RequestInit) {
    return this.fetch(url, {
      method: "PATCH",
      ...init,
      body: this.encode(data)
    });
  }

  public delete(url: string, init?: RequestInit) {
    return this.fetch(url, {
      method: "DELETE",
      ...init
    });
  }

  public addInterceptor(interceptor: InterceptorFn, pre = false) {
    pre
      ? this.interceptors.pre.push(interceptor)
      : this.interceptors.post.push(interceptor);
  }
}

import { HttpClient } from "lib/http";
import { Observable } from "rxjs";
import { environment } from "environments/environment";

export class TestService {
  private host: string = environment.host;
  private URI: string = `${this.host}/test`;

  constructor(private http: HttpClient) {}

  private headers() {
    // const token = localStorage.getItem('access_token')
    // return { 'Authorization': `Bearer ${token}`}
  }

  public list(): Observable<any> {
    return this.http.get(this.URI, {
      // headers: this.headers(),
    });
  }
}

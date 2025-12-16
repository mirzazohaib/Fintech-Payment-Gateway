import http from "k6/http";
import { check, sleep } from "k6";

// 1. Configuration: Load Pattern
// We simulate a realistic traffic spike:
// - Ramp up to 50 users over 30 seconds
// - Sustain 50 users for 1 minute
// - Ramp down to 0 over 10 seconds
export let options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "1m", target: 50 },
    { duration: "10s", target: 0 },
  ],
  // Define thresholds: fail if > 1% errors or latency > 500ms
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<500"], // 95% of requests should be faster than 500ms
  },
};

export default function () {
  // 2. Target: The Process API (running locally in Studio or Docker)
  // Ensure the port (8081) matches your Mule HTTP Listener configuration
  let url = "http://host.docker.internal:8083/payment";

  // 3. Payload: A valid payment object
  let payload = JSON.stringify({
    paymentId: `STRESS-TEST-${__VU}-${__ITER}`, // Unique ID per user/iteration
    amount: 100.0,
    currency: "EUR",
    debtorAccount: "FI893792",
  });

  let params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer load-test-token", // Simulating Auth
    },
  };

  // 4. Execution
  let res = http.post(url, payload, params);

  // 5. Validation
  // We check if the server responds with 200/201
  check(res, {
    "status is 200 or 201": (r) => r.status === 200 || r.status === 201,
  });

  // Random sleep between 0.5s and 1s to simulate real user behavior
  sleep(Math.random() * 0.5 + 0.5);
}

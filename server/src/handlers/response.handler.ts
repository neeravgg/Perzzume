import { ServerResponse } from 'http';
import express from 'express'
interface ApiResponse {
  message: string;
  success: boolean;
}

interface SuccessApiResponse<T> extends ApiResponse {
  result?: T;
}

interface ErrorApiResponse<T> extends ApiResponse {
  error: T;
}

const sendResponse = async <T>(
  res: express.Response,
  statusCode: number,
  message: string,
  success: boolean,
  result?: T,
  cookie?: { name: string; value: string; options?: any }
) => {
  // Set status code automatically (optional)
  res.status(statusCode);

  // Set cookies
  if (cookie) {
    res.cookie(cookie.name, cookie.value, cookie.options || {
      httpOnly: true, //accessible only by web server 
      // secure: true, //https
      sameSite: 'None', //cross-site cookie 
      maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    });
  }
  // Define response body with generic type
  const responseBody: SuccessApiResponse<T> = {
    message,
    success,
    result,
  };

  // Send JSON response
  res.json(responseBody);
};


const sendError = async <T>(
  res: express.Response,
  statusCode: number,
  message: string,
  success: boolean,
  error: T
) => {
  // Set status code automatically (optional)
  res.status(statusCode);

  // Define response body with generic type
  const responseBody: ErrorApiResponse<T> = {
    message,
    success,
    error,

  };
  // Send JSON response
  res.json(responseBody);
};

export { sendResponse, sendError };

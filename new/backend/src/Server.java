import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Server {
    private static final int PORT = 8080;
    private static final String DATA_DIR = "backend/data/";
    private static final String FRONTEND_DIR = "frontend/";

    public static void main(String[] args) throws IOException {
        int port = PORT;
        if (args.length > 0) {
            try {
                port = Integer.parseInt(args[0]);
            } catch (NumberFormatException ignored) {}
        }

        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        // API Endpoints
        server.createContext("/api/health", new HealthHandler());
        server.createContext("/api/student", new JsonDataHandler(DATA_DIR + "students.json"));
        server.createContext("/api/notices", new JsonDataHandler(DATA_DIR + "notices.json"));
        server.createContext("/api/events", new JsonDataHandler(DATA_DIR + "events.json"));
        server.createContext("/api/announcements", new JsonDataHandler(DATA_DIR + "announcements.json"));
        server.createContext("/api/academics", new JsonDataHandler(DATA_DIR + "academics.json"));
        server.createContext("/api/events/rsvp", new EventRsvpHandler());

        // Static Frontend file handler
        server.createContext("/", new StaticFileHandler());

        server.setExecutor(null); // default executor
        System.out.println("==================================================");
        System.out.println("   SRM US Live - University Student App Backend");
        System.out.println("==================================================");
        System.out.println(" * Server running at: http://localhost:" + port + "/");
        System.out.println(" * REST API Base URL: http://localhost:" + port + "/api/");
        System.out.println(" * Serving frontend from: " + FRONTEND_DIR);
        System.out.println("==================================================");
        server.start();
    }

    private static void setCorsHeaders(HttpExchange exchange) {
        exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        exchange.getResponseHeaders().set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    private static void sendJsonResponse(HttpExchange exchange, int statusCode, String responseJson) throws IOException {
        setCorsHeaders(exchange);
        exchange.getResponseHeaders().set("Content-Type", "application/json; charset=UTF-8");
        byte[] bytes = responseJson.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(statusCode, bytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(bytes);
        }
    }

    static class HealthHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                setCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                return;
            }
            String json = "{\"status\":\"healthy\",\"app\":\"SRM US Live\",\"version\":\"1.0.0\",\"timestamp\":\"" + System.currentTimeMillis() + "\"}";
            sendJsonResponse(exchange, 200, json);
        }
    }

    static class JsonDataHandler implements HttpHandler {
        private final String filePath;

        public JsonDataHandler(String filePath) {
            this.filePath = filePath;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                setCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            File file = new File(filePath);
            if (!file.exists()) {
                // Try searching relative to working directory or absolute
                file = new File("c:/CAPSTONE PROJECT 2026/" + filePath);
            }

            if (file.exists()) {
                String content = new String(Files.readAllBytes(file.toPath()), StandardCharsets.UTF_8);
                sendJsonResponse(exchange, 200, content);
            } else {
                String err = "{\"error\":\"Resource file not found: " + filePath + "\"}";
                sendJsonResponse(exchange, 404, err);
            }
        }
    }

    static class EventRsvpHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                setCorsHeaders(exchange);
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                InputStream is = exchange.getRequestBody();
                String body = new String(is.readAllBytes(), StandardCharsets.UTF_8);
                System.out.println("[API] RSVP received: " + body);
                String json = "{\"success\":true,\"message\":\"RSVP confirmed for SRM US Live Event!\",\"receivedPayload\":" + (body.isEmpty() ? "{}" : body) + "}";
                sendJsonResponse(exchange, 200, json);
            } else {
                sendJsonResponse(exchange, 405, "{\"error\":\"Method Not Allowed\"}");
            }
        }
    }

    static class StaticFileHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();
            if (path == null || path.equals("/") || path.isEmpty()) {
                path = "/index.html";
            }

            // Remove leading slash for local file resolution
            String relativePath = path.startsWith("/") ? path.substring(1) : path;
            File file = new File(FRONTEND_DIR + relativePath);
            if (!file.exists()) {
                file = new File("c:/CAPSTONE PROJECT 2026/" + FRONTEND_DIR + relativePath);
            }

            if (file.exists() && !file.isDirectory()) {
                String mimeType = getMimeType(file.getName());
                setCorsHeaders(exchange);
                exchange.getResponseHeaders().set("Content-Type", mimeType);
                byte[] fileBytes = Files.readAllBytes(file.toPath());
                exchange.sendResponseHeaders(200, fileBytes.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(fileBytes);
                }
            } else {
                String notFound = "404 Not Found: " + path;
                exchange.sendResponseHeaders(404, notFound.length());
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(notFound.getBytes(StandardCharsets.UTF_8));
                }
            }
        }

        private String getMimeType(String filename) {
            String lower = filename.toLowerCase();
            if (lower.endsWith(".html") || lower.endsWith(".htm")) return "text/html; charset=UTF-8";
            if (lower.endsWith(".css")) return "text/css; charset=UTF-8";
            if (lower.endsWith(".js")) return "application/javascript; charset=UTF-8";
            if (lower.endsWith(".json")) return "application/json; charset=UTF-8";
            if (lower.endsWith(".png")) return "image/png";
            if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
            if (lower.endsWith(".svg")) return "image/svg+xml";
            if (lower.endsWith(".ico")) return "image/x-icon";
            if (lower.endsWith(".woff2")) return "font/woff2";
            if (lower.endsWith(".woff")) return "font/woff";
            if (lower.endsWith(".ttf")) return "font/ttf";
            return "text/plain; charset=UTF-8";
        }
    }
}

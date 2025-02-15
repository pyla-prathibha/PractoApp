package com.practoapp.PractoApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = {"com.practoapp.PractoApp.jpa_repository", "com.practoapp.PractoApp.repository"})
@EnableElasticsearchRepositories(basePackages = "com.practoapp.PractoApp.elasticsearch_repository") // Elasticsearch repositories package
public class PractoAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(PractoAppApplication.class, args);
    }
}

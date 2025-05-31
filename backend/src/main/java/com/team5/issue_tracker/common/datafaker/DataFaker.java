package com.team5.issue_tracker.common.datafaker;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Locale;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

import lombok.extern.slf4j.Slf4j;
import net.datafaker.Faker;
import net.datafaker.transformations.CsvTransformer;
import net.datafaker.transformations.Field;
import net.datafaker.transformations.Schema;

import static net.datafaker.transformations.Field.field;

@Slf4j
public class DataFaker {
  private static final int milestoneCount = 5000; // 5000개 마일스톤 생성
  private static final int userCount = 100000; // 10만명 유저 생성
  private static final int commentCount = 1000000; // 100만개 댓글 생성
  private static final int issueCount = 100000; // 10만개 이슈 생성
  private static final int labelCount = 5000; // 5000개 라벨 생성
  private static final int issue_labelCount = 500000; // 50만개 이슈-라벨 관계 생성
  private static final int issue_assigneeCount = 500000; // 50만개 이슈-유저 관계 생성

  private static final String csvDirectory = "dummydata";
  private static final String userCsv = csvDirectory + "/user.csv";
  private static final String milestoneCsv = csvDirectory + "/milestone.csv";
  private static final String commentCsv = csvDirectory + "/comment.csv";
  private static final String issueCsv = csvDirectory + "/issue.csv";
  private static final String labelCsv = csvDirectory + "/label.csv";
  private static final String issueLabelCsv = csvDirectory + "/issue_label.csv";
  private static final String issueAssigneeCsv = csvDirectory + "/issue_assignee.csv";

  private static final Faker faker = new Faker(Locale.KOREAN, new Random(1));
  private static final Faker englishFaker = new Faker(Locale.ENGLISH, new Random(1));
  private static final Random random = new Random(1);

  private static final String separator = ",";
  private static final DateTimeFormatter formatter =
      DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss").withZone(ZoneId.of("UTC"));

  public static void main(String[] args) {
    // 저장할 디렉토리 생성
    createDirectoryIfNotExists(csvDirectory);

    // CSV 파일 생성
    generateMilestones(milestoneCount, milestoneCsv);
    generateUsers(userCount, userCsv);
    generateIssues(issueCount, issueCsv);
    generatComments(commentCount, commentCsv);
    generateLabels(labelCount, labelCsv);
    generateIssueLabels(issue_labelCount, issueLabelCsv);
    generateIssueAssignees(issue_assigneeCount, issueAssigneeCsv);
  }

  private static void generateIssueAssignees(int count, String path) {
    AtomicLong idSeq = new AtomicLong(1);
    Schema<String, String> schema =
        Schema.of(field("id", () -> String.valueOf(idSeq.getAndIncrement())),
            field("issue_id", () -> String.valueOf(faker.number().numberBetween(1, issueCount + 1))),
            field("assignee_id", () -> String.valueOf(faker.number().numberBetween(1, userCount + 1))));

    String csv = getCsv(schema, count);
    writeCsv(csv, path);
    log.info("✅ 이슈-유저 관계 CSV 파일 생성 완료: " + path);
  }

  private static void generateIssueLabels(int count, String path) {
    AtomicLong idSeq = new AtomicLong(1);
    Schema<String, String> schema =
        Schema.of(field("id", () -> String.valueOf(idSeq.getAndIncrement())),
            field("issue_id", () -> String.valueOf(faker.number().numberBetween(1, issueCount + 1))),
            field("label_id", () -> String.valueOf(faker.number().numberBetween(1, labelCount + 1))));

    String csv = getCsv(schema, count);
    writeCsv(csv, path);
    log.info("✅ 이슈-라벨 관계 CSV 파일 생성 완료: " + path);
  }

  private static void generateLabels(int count, String path) {
    AtomicLong idSeq = new AtomicLong(1);
    Schema<String, String> schema =
        Schema.of(field("id", () -> String.valueOf(idSeq.getAndIncrement())),
            field("name", () -> englishFaker.hacker().noun() + "_" + englishFaker.hacker().verb()),
            field("description", () -> faker.lorem().sentence()),
            field("text_color", () -> String.format("#%06X", random.nextInt(0xFFFFFF))),
            field("background_color", () -> String.format("#%06X", random.nextInt(0xFFFFFF))),
            field("is_open", () -> String.valueOf(faker.bool().bool())),
            getCreatedAt(faker),
            getUpdatedAt(faker));

    String csv = getCsv(schema, count);
    writeCsv(csv, path);
    log.info("✅ 라벨 CSV 파일 생성 완료: " + path);
  }

  private static void generatComments(int count, String path) {
    AtomicLong idSeq = new AtomicLong(1);
    Schema<String, String> schema =
        Schema.of(field("id", () -> String.valueOf(idSeq.getAndIncrement())),
            field("user_id", () -> String.valueOf(faker.number().numberBetween(1, userCount + 1))),
            field("issue_id", () -> String.valueOf(faker.number().numberBetween(1, issueCount + 1))),
            field("content", () -> faker.lorem().paragraph()),
            getCreatedAt(faker),
            getUpdatedAt(faker));

    String csv = getCsv(schema, count);
    writeCsv(csv, path);
    log.info("✅ 댓글 CSV 파일 생성 완료: " + path);
  }

  private static void generateIssues(int count, String path) {
    AtomicLong idSeq = new AtomicLong(1);
    Schema<String, String> schema =
        Schema.of(field("id", () -> String.valueOf(idSeq.getAndIncrement())),
            field("title", () -> englishFaker.book().title()),
            field("milestone_id",
                () -> String.valueOf(faker.number().numberBetween(1, milestoneCount + 1))),
            field("user_id", () -> String.valueOf(faker.number().numberBetween(1, userCount + 1))),
            field("is_open", () -> String.valueOf(faker.bool().bool())),
            getCreatedAt(faker),
            getUpdatedAt(faker));

    String csv = getCsv(schema, count);
    writeCsv(csv, path);
    log.info("✅ 이슈 CSV 파일 생성 완료: " + path);
  }

  private static void generateMilestones(int count, String path) {
    AtomicLong idSeq = new AtomicLong(1);
    Schema<String, String> schema =
        Schema.of(field("id", () -> String.valueOf(idSeq.getAndIncrement())),
            field("deadline", () -> {
              Instant deadline = faker.timeAndDate().future(100, TimeUnit.DAYS);
              return formatter.format(deadline);
            }),
            field("name", () -> englishFaker.hacker().noun() + "_" + englishFaker.hacker().verb()),
            field("description", () -> faker.lorem().sentence()),
            field("is_open", () -> String.valueOf(faker.bool().bool())),
            getCreatedAt(faker),
            getUpdatedAt(faker));

    String csv = getCsv(schema, count);
    writeCsv(csv, path);
    log.info("✅ 마일스톤 CSV 파일 생성 완료: " + path);
  }

  private static void generateUsers(int count, String path) {
    AtomicLong idSeq = new AtomicLong(1);
    Schema<String, String> schema =
        Schema.of(field("id", () -> String.valueOf(idSeq.getAndIncrement())),
            field("username", () -> englishFaker.name().name() + faker.number().digits(3)),
            field("email", () -> englishFaker.internet().emailAddress() + faker.number().digits(3)),
            field("image_url", () -> faker.internet().image()),
            field("password", () -> faker.internet().password()),
            getCreatedAt(faker),
            getUpdatedAt(faker));

    String csv = getCsv(schema, count);
    writeCsv(csv, path);
    log.info("✅ 유저 CSV 파일 생성 완료: " + path);
  }

  private static Field<String, String> getCreatedAt(Faker faker) {
    return field("created_at", () -> {
      Instant createdAt = faker.timeAndDate().between(
          Instant.now().minus(200, ChronoUnit.DAYS),
          Instant.now().minus(100, ChronoUnit.DAYS));
      return formatter.format(createdAt);
    });
  }

  private static Field<String, String> getUpdatedAt(Faker faker) {
    return field("updated_at", () -> {
      Instant updatedAt =
          faker.timeAndDate().between(
              Instant.now().minus(100, ChronoUnit.DAYS),
              Instant.now());
      return formatter.format(updatedAt);
    });
  }

  private static void writeCsv(String csv, String path) {
    try (BufferedWriter writer = new BufferedWriter(new FileWriter(path))) {
      writer.write(csv);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  private static String getCsv(Schema<String, String> schema, int count) {
    CsvTransformer<String> transformer =
        CsvTransformer.<String>builder().header(true).separator(separator).build();

    return transformer.generate(schema, count);
  }

  private static void createDirectoryIfNotExists(String dirName) {
    try {
      Path path = Paths.get(dirName);
      if (Files.notExists(path)) {
        Files.createDirectories(path); // 중간 디렉토리까지 포함해 생성
        log.info("📁 디렉토리 생성됨: " + path.toAbsolutePath());
      } else {
        log.info("✅ 디렉토리 이미 존재함: " + path.toAbsolutePath());
      }
    } catch (IOException e) {
      e.printStackTrace();
      throw new RuntimeException("❌ 디렉토리 생성 실패: " + dirName);
    }
  }
}

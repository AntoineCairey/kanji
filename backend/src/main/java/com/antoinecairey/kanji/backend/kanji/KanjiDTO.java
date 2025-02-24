package com.antoinecairey.kanji.backend.kanji;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class KanjiDTO {
  private Long id;
  private String symbol;
  private String fr;
  private String kun;
  private String onn;
}

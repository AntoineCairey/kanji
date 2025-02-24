package com.antoinecairey.kanji.backend.kanji;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface KanjiMapper {
  KanjiMapper INSTANCE = Mappers.getMapper(KanjiMapper.class);

  KanjiDTO toDto(Kanji kanji);

  @Mapping(target = "id", ignore = true)
  Kanji toEntity(KanjiDTO dto);
}

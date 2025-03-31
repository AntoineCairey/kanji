package com.antoinecairey.kanji.backend.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
  UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

  UserDTO toDto(User user);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "role", ignore = true)
  User toEntity(UserAuthDTO userAuthDTO);
}

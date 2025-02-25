package com.antoinecairey.kanji.backend.kanji;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/kanji")
@CrossOrigin(origins = "http://localhost:4200")
public class KanjiController {
  private final KanjiService service;

  public KanjiController(KanjiService service) {
    this.service = service;
  }

  @GetMapping
  public List<KanjiDTO> getAllKanjis() {
    return service.getAllKanjis();
  }

  @GetMapping("/{id}")
  public ResponseEntity<KanjiDTO> getKanjiById(@PathVariable Long id) {
    return service.getKanjiById(id)
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public Kanji addKanji(@RequestBody KanjiDTO dto) {
    return service.addKanji(dto);
  }

  @DeleteMapping("/{id}")
  public void deleteKanji(@PathVariable Long id) {
    service.deleteKanji(id);
  }
}

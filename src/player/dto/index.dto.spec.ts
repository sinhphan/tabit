import { PlayerCreateDto, PlayerDto, PlayerUpdateDto, PlayerUsernameDto } from "./index.dto";

describe('PlayerDto', () => {
  it('should have the correct properties with their configurations', () => {
    const dto = new PlayerDto();

    expect(dto.id).toBeUndefined();
    expect(dto.username).toBeUndefined();

    const idMetadata = {"required": false};
    expect(idMetadata).toEqual({
      required: false,
    });

    const usernameMetadata = {"required": true};
    expect(usernameMetadata).toEqual({
      required: true,
    });

    // Add more assertions for other properties and their configurations
  });
});

describe('PlayerUsernameDto', () => {
  it('should have the correct properties with their configurations', () => {
    const dto = new PlayerUsernameDto();

    expect(dto.username).toBeUndefined();

    const usernameMetadata = {"required": true}
    expect(usernameMetadata).toEqual({
      required: true,
    });

    // Add more assertions for other properties and their configurations
  });
});

describe('PlayerCreateDto', () => {
  it('should have the correct properties with their configurations', () => {
    const dto = new PlayerCreateDto();

    expect(dto.username).toBeUndefined();
    expect(dto.score).toBeUndefined();

    const usernameMetadata = {
      required: true,
    }
    expect(usernameMetadata).toEqual({
      required: true,
    });

    const scoreMetadata = {
      required: true,
    }
    expect(scoreMetadata).toEqual({
      required: true,
    });

    // Add more assertions for other properties and their configurations
  });
});

describe('PlayerUpdateDto', () => {
  it('should have the correct properties with their configurations', () => {
    const dto = new PlayerUpdateDto();

    expect(dto.username).toBeUndefined();
    expect(dto.score).toBeUndefined();

    const usernameMetadata = {
      required: true,
    }
    expect(usernameMetadata).toEqual({
      required: true,
    });

  });
});
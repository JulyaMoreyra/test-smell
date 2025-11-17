const { UserService } = require('../src/userService');

describe('UserService - Clean and Refactored Test Suite', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    userService._clearDB();
  });

  // USER CREATION & RETRIEVAL
  test('should create a user and generate a valid ID', () => {
    const name = 'Julia';
    const email = 'Julia.Moreira@gmail.com';
    const age = 23;

    const createdUser = userService.createUser(name, email, age);

    expect(createdUser.id).toBeDefined();
    expect(typeof createdUser.id).toBe('string');
  });

  test('should retrieve a user by ID after creation', () => {
    const createdUser = userService.createUser('Julia', 'Julia.Moreira@gmail.com', 23);

    const fetchedUser = userService.getUserById(createdUser.id);

    expect(fetchedUser).not.toBeNull();
    expect(fetchedUser.nome).toBe('Julia');
    expect(fetchedUser.status).toBe('ativo');
  });

  // USER DEACTIVATION
  test('should deactivate a regular user successfully', () => {
    const user = userService.createUser('Laura', 'LauraMoreira@gmail.com', 19);

    const result = userService.deactivateUser(user.id);
    const updatedUser = userService.getUserById(user.id);

    expect(result).toBe(true);
    expect(updatedUser.status).toBe('inativo');
  });

  test('should not deactivate an admin user', () => {
    const admin = userService.createUser('Admin', 'admin@example.com', 40, true);

    const result = userService.deactivateUser(admin.id);
    const updatedUser = userService.getUserById(admin.id);

    expect(result).toBe(false);
    expect(updatedUser.status).toBe('ativo');
  });

  // USER REPORT
  test('should generate a report containing all users', () => {
    const gabriel = userService.createUser('Gabril', 'tinoco@gmail.com', 22);
    const samuel = userService.createUser('Samuel', 'satinooco@gmail.com', 20);

    const report = userService.generateUserReport();

    expect(report).toContain(gabriel.nome);
    expect(report).toContain(samuel.nome);
    expect(report).toContain('Relatório');
  });

  // AGE VALIDATION
  test('should throw an error when creating an underage user', () => {
    const name = 'Minor';
    const email = 'minor@example.com';
    const age = 17;

    expect(() =>
      userService.createUser(name, email, age)
    ).toThrow('O usuário deve ser maior de idade.');
  });

  // USER LISTING
  test('should return an empty list when there are no users', () => {
    // Act
    const report = userService.generateUserReport();

    // Assert
    expect(report).toContain('Nenhum usuário cadastrado.');
  });
});

import jwt from 'jsonwebtoken';

/**
 * @class
 * @category Auth
 * @subcategory Services
 */
class JwtService {
  /**
   * Generate access token which expires in 1 hour
   * @method
   * @param userId
   * @param secretKey
   */
  getToken(userId: string, secretKey: string) {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  }

  /**
   * Verify access token
   * @param token
   * @param secretKey
   */
  verifyToken(token: string, secretKey: string) {
    return jwt.verify(token, secretKey) as { userId: string };
  }
}

export default new JwtService();

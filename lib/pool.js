"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pool = void 0;

var _pg = require("pg");

var _implementExecutor = require("./implement-executor");

class Pool extends _pg.Pool {
  constructor(config) {
    super(config);

    if (config) {
      const {
        log
      } = config;
      this.logQuery = log;
    }

    (0, _implementExecutor.implementExecutor)(this, this.logQuery);
  }
  /** Execute transaction.
   * Follow https://node-postgres.com/features/transactions
   */


  executeTransaction = async transaction => {
    const client = await this.connect();
    const extendedClient = (0, _implementExecutor.implementExecutor)(client, this.logQuery);
    return extendedClient.query('BEGIN').then(() => transaction(extendedClient)).then(() => extendedClient.query('COMMIT')).catch(e => extendedClient.query('ROLLBACK').then(() => e)).finally(() => extendedClient.release());
  };
}

exports.Pool = Pool;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wb29sLnRzIl0sIm5hbWVzIjpbIlBvb2wiLCJQZ1Bvb2wiLCJjb25zdHJ1Y3RvciIsImNvbmZpZyIsImxvZyIsImxvZ1F1ZXJ5IiwiZXhlY3V0ZVRyYW5zYWN0aW9uIiwidHJhbnNhY3Rpb24iLCJjbGllbnQiLCJjb25uZWN0IiwiZXh0ZW5kZWRDbGllbnQiLCJxdWVyeSIsInRoZW4iLCJjYXRjaCIsImUiLCJmaW5hbGx5IiwicmVsZWFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUVPLE1BQU1BLElBQU4sU0FBbUJDLFFBQW5CLENBQWtEO0FBZXZEQyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBOEI7QUFDdkMsVUFBTUEsTUFBTjs7QUFDQSxRQUFJQSxNQUFKLEVBQVk7QUFDVixZQUFNO0FBQUNDLFFBQUFBO0FBQUQsVUFBUUQsTUFBZDtBQUNBLFdBQUtFLFFBQUwsR0FBZ0JELEdBQWhCO0FBQ0Q7O0FBQ0QsOENBQWtCLElBQWxCLEVBQXdCLEtBQUtDLFFBQTdCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7OztBQUNFQyxFQUFBQSxrQkFBa0IsR0FBRyxNQUFPQyxXQUFQLElBQXFGO0FBQ3hHLFVBQU1DLE1BQU0sR0FBRyxNQUFNLEtBQUtDLE9BQUwsRUFBckI7QUFDQSxVQUFNQyxjQUFjLEdBQUcsMENBQXNDRixNQUF0QyxFQUFvRSxLQUFLSCxRQUF6RSxDQUF2QjtBQUNBLFdBQU9LLGNBQWMsQ0FDbEJDLEtBREksQ0FDRSxPQURGLEVBRUpDLElBRkksQ0FFQyxNQUFNTCxXQUFXLENBQUNHLGNBQUQsQ0FGbEIsRUFHSkUsSUFISSxDQUdDLE1BQU1GLGNBQWMsQ0FBQ0MsS0FBZixDQUFxQixRQUFyQixDQUhQLEVBSUpFLEtBSkksQ0FJR0MsQ0FBRCxJQUFPSixjQUFjLENBQUNDLEtBQWYsQ0FBcUIsVUFBckIsRUFBaUNDLElBQWpDLENBQXNDLE1BQU1FLENBQTVDLENBSlQsRUFLSkMsT0FMSSxDQUtJLE1BQU1MLGNBQWMsQ0FBQ00sT0FBZixFQUxWLENBQVA7QUFNRCxHQVRpQjtBQTNCcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Bvb2wgYXMgUGdQb29sfSBmcm9tICdwZyc7XG5pbXBvcnQgdHlwZSB7RXh0ZW5kZWRQb29sQ29uZmlnLCBEYlF1ZXJ5LCBFeHRlbmRlZFBvb2wsIEV4dGVuZGVkUG9vbENsaWVudH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7aW1wbGVtZW50RXhlY3V0b3J9IGZyb20gJy4vaW1wbGVtZW50LWV4ZWN1dG9yJztcblxuZXhwb3J0IGNsYXNzIFBvb2wgZXh0ZW5kcyBQZ1Bvb2wgaW1wbGVtZW50cyBFeHRlbmRlZFBvb2wge1xuICBwcml2YXRlIGxvZ1F1ZXJ5PzogRXh0ZW5kZWRQb29sQ29uZmlnWydsb2cnXTtcblxuICBleGVjdXRlUXVlcnk6IDxUPihxdWVyeTogRGJRdWVyeSkgPT4gUHJvbWlzZTxUW10+O1xuXG4gIGNvdW50OiAocXVlcnk6IERiUXVlcnkpID0+IFByb21pc2U8bnVtYmVyPjtcblxuICBnZXRCeUlkOiAodGFibGU6IHN0cmluZykgPT4gPFJlY29yZCwgSWQ+KGlkOiBJZCwgZmllbGRzPzogc3RyaW5nW10sIGlkRmllbGQ/OiBzdHJpbmcpID0+IFByb21pc2U8UmVjb3JkPjtcblxuICBjcmVhdGU6ICh0YWJsZTogc3RyaW5nKSA9PiA8UmVjb3JkLCBJZD4ocmVjb3JkOiBQYXJ0aWFsPFJlY29yZD4pID0+IFByb21pc2U8SWQ+O1xuXG4gIHVwZGF0ZTogKHRhYmxlOiBzdHJpbmcpID0+IDxSZWNvcmQsIElkPihpZDogSWQsIHVwZGF0ZWREYXRhOiBQYXJ0aWFsPFJlY29yZD4sIGlkRmllbGQ/OiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG5cbiAgcmVtb3ZlOiAodGFibGU6IHN0cmluZykgPT4gPElkPihpZDogSWQsIGlkRmllbGQ/OiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG5cbiAgY29uc3RydWN0b3IoY29uZmlnPzogRXh0ZW5kZWRQb29sQ29uZmlnKSB7XG4gICAgc3VwZXIoY29uZmlnKTtcbiAgICBpZiAoY29uZmlnKSB7XG4gICAgICBjb25zdCB7bG9nfSA9IGNvbmZpZztcbiAgICAgIHRoaXMubG9nUXVlcnkgPSBsb2c7XG4gICAgfVxuICAgIGltcGxlbWVudEV4ZWN1dG9yKHRoaXMsIHRoaXMubG9nUXVlcnkpO1xuICB9XG5cbiAgLyoqIEV4ZWN1dGUgdHJhbnNhY3Rpb24uXG4gICAqIEZvbGxvdyBodHRwczovL25vZGUtcG9zdGdyZXMuY29tL2ZlYXR1cmVzL3RyYW5zYWN0aW9uc1xuICAgKi9cbiAgZXhlY3V0ZVRyYW5zYWN0aW9uID0gYXN5bmMgKHRyYW5zYWN0aW9uOiAoY2xpZW50OiBFeHRlbmRlZFBvb2xDbGllbnQpID0+IFByb21pc2U8dm9pZD4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCBjbGllbnQgPSBhd2FpdCB0aGlzLmNvbm5lY3QoKTtcbiAgICBjb25zdCBleHRlbmRlZENsaWVudCA9IGltcGxlbWVudEV4ZWN1dG9yPEV4dGVuZGVkUG9vbENsaWVudD4oY2xpZW50IGFzIEV4dGVuZGVkUG9vbENsaWVudCwgdGhpcy5sb2dRdWVyeSk7XG4gICAgcmV0dXJuIGV4dGVuZGVkQ2xpZW50XG4gICAgICAucXVlcnkoJ0JFR0lOJylcbiAgICAgIC50aGVuKCgpID0+IHRyYW5zYWN0aW9uKGV4dGVuZGVkQ2xpZW50KSlcbiAgICAgIC50aGVuKCgpID0+IGV4dGVuZGVkQ2xpZW50LnF1ZXJ5KCdDT01NSVQnKSlcbiAgICAgIC5jYXRjaCgoZSkgPT4gZXh0ZW5kZWRDbGllbnQucXVlcnkoJ1JPTExCQUNLJykudGhlbigoKSA9PiBlKSlcbiAgICAgIC5maW5hbGx5KCgpID0+IGV4dGVuZGVkQ2xpZW50LnJlbGVhc2UoKSk7XG4gIH07XG59XG4iXX0=
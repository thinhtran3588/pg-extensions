"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildQuery = void 0;

/** build postgres sql query & params */
const buildQuery = query => {
  const {
    fields,
    queryText,
    table,
    whereClause,
    sortBy,
    pageIndex,
    rowsPerPage,
    params
  } = query;
  let {
    limit,
    offset
  } = query;
  const fieldsClause = fields ? fields.map(field => `${field} as "${field}"`).join(',') : '';
  let finalQueryText;
  let paramInx = 1;
  const paramsArr = []; // build query

  if (!queryText) {
    finalQueryText = `SELECT ${fieldsClause || '*'} FROM ${table}`;
    finalQueryText += whereClause ? ` WHERE ${whereClause}` : '';
  } else {
    finalQueryText = `SELECT ${fieldsClause || '*'} FROM (${queryText}) AS T`;
  } // add sort by


  if (sortBy && sortBy.length > 0) {
    finalQueryText += ` ORDER BY ${sortBy.map(m => m.replace('|', ' ')).join(', ')}`;
  } // add limit/offset


  if (typeof pageIndex === 'number' && typeof rowsPerPage === 'number') {
    limit = rowsPerPage;
    offset = rowsPerPage * pageIndex;
  }

  if (typeof limit === 'number') {
    finalQueryText += ` LIMIT $${paramInx}`;
    paramsArr.push(limit);
    paramInx += 1;
  }

  if (typeof offset === 'number') {
    finalQueryText += ` OFFSET $${paramInx}`;
    paramsArr.push(offset);
    paramInx += 1;
  } // assign params


  if (params) {
    Object.keys(params).forEach(paramName => {
      const splitQueryArr = finalQueryText.split(`:${paramName}`);

      if (splitQueryArr.length > 1) {
        let newQuery = splitQueryArr[0];
        splitQueryArr.forEach((part, index) => {
          if (index > 0) {
            newQuery += `$${paramInx}${part}`;
            paramsArr.push(params[paramName]);
            paramInx += 1;
          }
        });
        finalQueryText = newQuery;
      }
    });
  }

  return {
    queryText: finalQueryText,
    params: paramsArr
  };
};

exports.buildQuery = buildQuery;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9idWlsZC1xdWVyeS50cyJdLCJuYW1lcyI6WyJidWlsZFF1ZXJ5IiwicXVlcnkiLCJmaWVsZHMiLCJxdWVyeVRleHQiLCJ0YWJsZSIsIndoZXJlQ2xhdXNlIiwic29ydEJ5IiwicGFnZUluZGV4Iiwicm93c1BlclBhZ2UiLCJwYXJhbXMiLCJsaW1pdCIsIm9mZnNldCIsImZpZWxkc0NsYXVzZSIsIm1hcCIsImZpZWxkIiwiam9pbiIsImZpbmFsUXVlcnlUZXh0IiwicGFyYW1JbngiLCJwYXJhbXNBcnIiLCJsZW5ndGgiLCJtIiwicmVwbGFjZSIsInB1c2giLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInBhcmFtTmFtZSIsInNwbGl0UXVlcnlBcnIiLCJzcGxpdCIsIm5ld1F1ZXJ5IiwicGFydCIsImluZGV4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUE7QUFDTyxNQUFNQSxVQUFVLEdBQUlDLEtBQUQsSUFBNkQ7QUFDckYsUUFBTTtBQUFDQyxJQUFBQSxNQUFEO0FBQVNDLElBQUFBLFNBQVQ7QUFBb0JDLElBQUFBLEtBQXBCO0FBQTJCQyxJQUFBQSxXQUEzQjtBQUF3Q0MsSUFBQUEsTUFBeEM7QUFBZ0RDLElBQUFBLFNBQWhEO0FBQTJEQyxJQUFBQSxXQUEzRDtBQUF3RUMsSUFBQUE7QUFBeEUsTUFBa0ZSLEtBQXhGO0FBQ0EsTUFBSTtBQUFDUyxJQUFBQSxLQUFEO0FBQVFDLElBQUFBO0FBQVIsTUFBa0JWLEtBQXRCO0FBQ0EsUUFBTVcsWUFBWSxHQUFHVixNQUFNLEdBQUdBLE1BQU0sQ0FBQ1csR0FBUCxDQUFZQyxLQUFELElBQVksR0FBRUEsS0FBTSxRQUFPQSxLQUFNLEdBQTVDLEVBQWdEQyxJQUFoRCxDQUFxRCxHQUFyRCxDQUFILEdBQStELEVBQTFGO0FBQ0EsTUFBSUMsY0FBSjtBQUNBLE1BQUlDLFFBQVEsR0FBRyxDQUFmO0FBQ0EsUUFBTUMsU0FBUyxHQUFHLEVBQWxCLENBTnFGLENBUXJGOztBQUNBLE1BQUksQ0FBQ2YsU0FBTCxFQUFnQjtBQUNkYSxJQUFBQSxjQUFjLEdBQUksVUFBU0osWUFBWSxJQUFJLEdBQUksU0FBUVIsS0FBTSxFQUE3RDtBQUNBWSxJQUFBQSxjQUFjLElBQUlYLFdBQVcsR0FBSSxVQUFTQSxXQUFZLEVBQXpCLEdBQTZCLEVBQTFEO0FBQ0QsR0FIRCxNQUdPO0FBQ0xXLElBQUFBLGNBQWMsR0FBSSxVQUFTSixZQUFZLElBQUksR0FBSSxVQUFTVCxTQUFVLFFBQWxFO0FBQ0QsR0Fkb0YsQ0FnQnJGOzs7QUFDQSxNQUFJRyxNQUFNLElBQUlBLE1BQU0sQ0FBQ2EsTUFBUCxHQUFnQixDQUE5QixFQUFpQztBQUMvQkgsSUFBQUEsY0FBYyxJQUFLLGFBQVlWLE1BQU0sQ0FBQ08sR0FBUCxDQUFZTyxDQUFELElBQU9BLENBQUMsQ0FBQ0MsT0FBRixDQUFVLEdBQVYsRUFBZSxHQUFmLENBQWxCLEVBQXVDTixJQUF2QyxDQUE0QyxJQUE1QyxDQUFrRCxFQUFqRjtBQUNELEdBbkJvRixDQXFCckY7OztBQUNBLE1BQUksT0FBT1IsU0FBUCxLQUFxQixRQUFyQixJQUFpQyxPQUFPQyxXQUFQLEtBQXVCLFFBQTVELEVBQXNFO0FBQ3BFRSxJQUFBQSxLQUFLLEdBQUdGLFdBQVI7QUFDQUcsSUFBQUEsTUFBTSxHQUFHSCxXQUFXLEdBQUdELFNBQXZCO0FBQ0Q7O0FBQ0QsTUFBSSxPQUFPRyxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzdCTSxJQUFBQSxjQUFjLElBQUssV0FBVUMsUUFBUyxFQUF0QztBQUNBQyxJQUFBQSxTQUFTLENBQUNJLElBQVYsQ0FBZVosS0FBZjtBQUNBTyxJQUFBQSxRQUFRLElBQUksQ0FBWjtBQUNEOztBQUNELE1BQUksT0FBT04sTUFBUCxLQUFrQixRQUF0QixFQUFnQztBQUM5QkssSUFBQUEsY0FBYyxJQUFLLFlBQVdDLFFBQVMsRUFBdkM7QUFDQUMsSUFBQUEsU0FBUyxDQUFDSSxJQUFWLENBQWVYLE1BQWY7QUFDQU0sSUFBQUEsUUFBUSxJQUFJLENBQVo7QUFDRCxHQW5Db0YsQ0FxQ3JGOzs7QUFDQSxNQUFJUixNQUFKLEVBQVk7QUFDVmMsSUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVlmLE1BQVosRUFBb0JnQixPQUFwQixDQUE2QkMsU0FBRCxJQUFlO0FBQ3pDLFlBQU1DLGFBQWEsR0FBR1gsY0FBYyxDQUFDWSxLQUFmLENBQXNCLElBQUdGLFNBQVUsRUFBbkMsQ0FBdEI7O0FBQ0EsVUFBSUMsYUFBYSxDQUFDUixNQUFkLEdBQXVCLENBQTNCLEVBQThCO0FBQzVCLFlBQUlVLFFBQVEsR0FBR0YsYUFBYSxDQUFDLENBQUQsQ0FBNUI7QUFDQUEsUUFBQUEsYUFBYSxDQUFDRixPQUFkLENBQXNCLENBQUNLLElBQUQsRUFBT0MsS0FBUCxLQUFpQjtBQUNyQyxjQUFJQSxLQUFLLEdBQUcsQ0FBWixFQUFlO0FBQ2JGLFlBQUFBLFFBQVEsSUFBSyxJQUFHWixRQUFTLEdBQUVhLElBQUssRUFBaEM7QUFDQVosWUFBQUEsU0FBUyxDQUFDSSxJQUFWLENBQWViLE1BQU0sQ0FBQ2lCLFNBQUQsQ0FBckI7QUFDQVQsWUFBQUEsUUFBUSxJQUFJLENBQVo7QUFDRDtBQUNGLFNBTkQ7QUFPQUQsUUFBQUEsY0FBYyxHQUFHYSxRQUFqQjtBQUNEO0FBQ0YsS0FiRDtBQWNEOztBQUVELFNBQU87QUFDTDFCLElBQUFBLFNBQVMsRUFBRWEsY0FETjtBQUVMUCxJQUFBQSxNQUFNLEVBQUVTO0FBRkgsR0FBUDtBQUlELENBM0RNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUge0RiUXVlcnl9IGZyb20gJ0BsaWIvaW50ZXJmYWNlcyc7XG5cbi8qKiBidWlsZCBwb3N0Z3JlcyBzcWwgcXVlcnkgJiBwYXJhbXMgKi9cbmV4cG9ydCBjb25zdCBidWlsZFF1ZXJ5ID0gKHF1ZXJ5OiBEYlF1ZXJ5KToge3F1ZXJ5VGV4dDogc3RyaW5nOyBwYXJhbXM/OiB1bmtub3duW119ID0+IHtcbiAgY29uc3Qge2ZpZWxkcywgcXVlcnlUZXh0LCB0YWJsZSwgd2hlcmVDbGF1c2UsIHNvcnRCeSwgcGFnZUluZGV4LCByb3dzUGVyUGFnZSwgcGFyYW1zfSA9IHF1ZXJ5O1xuICBsZXQge2xpbWl0LCBvZmZzZXR9ID0gcXVlcnk7XG4gIGNvbnN0IGZpZWxkc0NsYXVzZSA9IGZpZWxkcyA/IGZpZWxkcy5tYXAoKGZpZWxkKSA9PiBgJHtmaWVsZH0gYXMgXCIke2ZpZWxkfVwiYCkuam9pbignLCcpIDogJyc7XG4gIGxldCBmaW5hbFF1ZXJ5VGV4dDogc3RyaW5nO1xuICBsZXQgcGFyYW1JbnggPSAxO1xuICBjb25zdCBwYXJhbXNBcnIgPSBbXTtcblxuICAvLyBidWlsZCBxdWVyeVxuICBpZiAoIXF1ZXJ5VGV4dCkge1xuICAgIGZpbmFsUXVlcnlUZXh0ID0gYFNFTEVDVCAke2ZpZWxkc0NsYXVzZSB8fCAnKid9IEZST00gJHt0YWJsZX1gO1xuICAgIGZpbmFsUXVlcnlUZXh0ICs9IHdoZXJlQ2xhdXNlID8gYCBXSEVSRSAke3doZXJlQ2xhdXNlfWAgOiAnJztcbiAgfSBlbHNlIHtcbiAgICBmaW5hbFF1ZXJ5VGV4dCA9IGBTRUxFQ1QgJHtmaWVsZHNDbGF1c2UgfHwgJyonfSBGUk9NICgke3F1ZXJ5VGV4dH0pIEFTIFRgO1xuICB9XG5cbiAgLy8gYWRkIHNvcnQgYnlcbiAgaWYgKHNvcnRCeSAmJiBzb3J0QnkubGVuZ3RoID4gMCkge1xuICAgIGZpbmFsUXVlcnlUZXh0ICs9IGAgT1JERVIgQlkgJHtzb3J0QnkubWFwKChtKSA9PiBtLnJlcGxhY2UoJ3wnLCAnICcpKS5qb2luKCcsICcpfWA7XG4gIH1cblxuICAvLyBhZGQgbGltaXQvb2Zmc2V0XG4gIGlmICh0eXBlb2YgcGFnZUluZGV4ID09PSAnbnVtYmVyJyAmJiB0eXBlb2Ygcm93c1BlclBhZ2UgPT09ICdudW1iZXInKSB7XG4gICAgbGltaXQgPSByb3dzUGVyUGFnZTtcbiAgICBvZmZzZXQgPSByb3dzUGVyUGFnZSAqIHBhZ2VJbmRleDtcbiAgfVxuICBpZiAodHlwZW9mIGxpbWl0ID09PSAnbnVtYmVyJykge1xuICAgIGZpbmFsUXVlcnlUZXh0ICs9IGAgTElNSVQgJCR7cGFyYW1Jbnh9YDtcbiAgICBwYXJhbXNBcnIucHVzaChsaW1pdCk7XG4gICAgcGFyYW1JbnggKz0gMTtcbiAgfVxuICBpZiAodHlwZW9mIG9mZnNldCA9PT0gJ251bWJlcicpIHtcbiAgICBmaW5hbFF1ZXJ5VGV4dCArPSBgIE9GRlNFVCAkJHtwYXJhbUlueH1gO1xuICAgIHBhcmFtc0Fyci5wdXNoKG9mZnNldCk7XG4gICAgcGFyYW1JbnggKz0gMTtcbiAgfVxuXG4gIC8vIGFzc2lnbiBwYXJhbXNcbiAgaWYgKHBhcmFtcykge1xuICAgIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaCgocGFyYW1OYW1lKSA9PiB7XG4gICAgICBjb25zdCBzcGxpdFF1ZXJ5QXJyID0gZmluYWxRdWVyeVRleHQuc3BsaXQoYDoke3BhcmFtTmFtZX1gKTtcbiAgICAgIGlmIChzcGxpdFF1ZXJ5QXJyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbGV0IG5ld1F1ZXJ5ID0gc3BsaXRRdWVyeUFyclswXTtcbiAgICAgICAgc3BsaXRRdWVyeUFyci5mb3JFYWNoKChwYXJ0LCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgIG5ld1F1ZXJ5ICs9IGAkJHtwYXJhbUlueH0ke3BhcnR9YDtcbiAgICAgICAgICAgIHBhcmFtc0Fyci5wdXNoKHBhcmFtc1twYXJhbU5hbWVdKTtcbiAgICAgICAgICAgIHBhcmFtSW54ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZmluYWxRdWVyeVRleHQgPSBuZXdRdWVyeTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcXVlcnlUZXh0OiBmaW5hbFF1ZXJ5VGV4dCxcbiAgICBwYXJhbXM6IHBhcmFtc0FycixcbiAgfTtcbn07XG4iXX0=
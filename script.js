<script>
  $(document).ready(function () {

    // Toggle input visibility when clicking the search icon
    $('.search-icon').click(function (e) {
      e.preventDefault();
      $('.search-input-wrapper').toggle();
      $('.search-input').focus();
    });

    // Hide when clicking outside
    $(document).click(function (event) {
      if (!$(event.target).closest('.search-input-wrapper, .search-icon').length) {
        $('.search-input-wrapper').hide();
      }
    });
    
  });
</script>

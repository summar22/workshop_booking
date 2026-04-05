import datetime as dt

from django.utils import timezone
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from workshop_app.models import Workshop, states
from workshop_app.serializers import WorkshopSerializer


def is_instructor(user):
    return user.groups.filter(name='instructor').exists()


@api_view(['GET'])
@permission_classes([AllowAny])
def api_workshop_public_stats(request):
    """Public workshop statistics API"""
    from_date = request.GET.get('from_date')
    to_date = request.GET.get('to_date')
    state = request.GET.get('state')
    workshoptype = request.GET.get('workshop_type')
    show_workshops = request.GET.get('show_workshops')
    sort = request.GET.get('sort', 'date')
    page = int(request.GET.get('page', 1))
    per_page = 30

    if from_date and to_date:
        workshops = Workshop.objects.filter(
            date__range=(from_date, to_date), status=1
        ).order_by(sort)
        if state:
            workshops = workshops.filter(coordinator__profile__state=state)
        if workshoptype:
            workshops = workshops.filter(workshop_type_id=workshoptype)
    else:
        today = timezone.now()
        upto = today + dt.timedelta(days=15)
        workshops = Workshop.objects.filter(
            date__range=(today, upto), status=1
        ).order_by('date')

    if show_workshops and request.user.is_authenticated:
        if is_instructor(request.user):
            workshops = workshops.filter(instructor_id=request.user.id)
        else:
            workshops = workshops.filter(coordinator_id=request.user.id)

    # Get chart data
    ws_states, ws_count = Workshop.objects.get_workshops_by_state(workshops)
    ws_type, ws_type_count = Workshop.objects.get_workshops_by_type(workshops)

    # Pagination
    total = workshops.count()
    start = (page - 1) * per_page
    end = start + per_page
    paginated_workshops = workshops[start:end]

    serializer = WorkshopSerializer(paginated_workshops, many=True)

    return Response({
        'workshops': serializer.data,
        'total': total,
        'page': page,
        'per_page': per_page,
        'num_pages': (total + per_page - 1) // per_page if total > 0 else 1,
        'chart_data': {
            'states': ws_states,
            'state_counts': ws_count,
            'types': ws_type,
            'type_counts': ws_type_count,
        }
    })
